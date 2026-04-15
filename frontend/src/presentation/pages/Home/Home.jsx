import Layout from "../../components/shared/Layout/Layout";
import Button from '../../components/ui/Button.jsx';
import styles from './Home.module.css';
import { useState, useEffect, useCallback } from "react";
import PostEditor from "../../components/ui/Post/PostEditor/PostEditor.jsx";
import PostCard from "../../components/ui/Post/PostCard/PostCard.jsx";
import { PublicacionRepository } from "../../../infrastructure/repositories/PublicacionRepository.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { socket } from "../../../infrastructure/realtime/socket.js";

function matchesRaiz(post, publicacionIdRaiz) {
  const raiz = post.id_publicacion_raiz ?? post.id;
  return raiz === publicacionIdRaiz;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]); // Estado para guardar las publicaciones
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const onPatchByRaiz = useCallback((publicacionIdRaiz, patch) => {
    setPosts((prev) =>
      prev.map((p) => (matchesRaiz(p, publicacionIdRaiz) ? { ...p, ...patch } : p)),
    );
  }, []);

  const onPrependPost = useCallback((nuevo) => {
    setPosts((prev) => {
      if (!nuevo?.id) return prev;
      if (prev.some((p) => p.id === nuevo.id)) return prev;
      return [nuevo, ...prev];
    });
  }, []);

  // 1. Cargar el Feed desde el servidor
  useEffect(() => {
    const cargarFeed = async () => {
      try {
        setLoading(true);
        const response = await PublicacionRepository.listar();

        // Verificamos si la data viene en .data (por Axios/Backend) o directa
        const dataFinal = response?.data ?? response;
        
        console.log("Datos recibidos en Home:", dataFinal);
        setPosts(Array.isArray(dataFinal) ? dataFinal : []);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarFeed();
  }, [step]); // Se recarga si cambias de pestaña "Para ti" / "Siguiendo"

  useEffect(() => {
    function onLike(payload) {
      setPosts((prev) =>
        prev.map((p) => {
          if (!matchesRaiz(p, payload.publicacionIdRaiz)) return p;
          const next = { ...p, likes_count: payload.likes_count };
          if (user?.id && payload.likedByUserId === user.id) {
            next.liked_by_me = payload.liked;
          }
          return next;
        }),
      );
    }

    function onComment(payload) {
      setPosts((prev) =>
        prev.map((p) =>
          matchesRaiz(p, payload.publicacionIdRaiz)
            ? { ...p, comentarios_count: payload.comentarios_count }
            : p,
        ),
      );
    }

    function onRepost(payload) {
      setPosts((prev) => {
        const patched = prev.map((p) =>
          matchesRaiz(p, payload.publicacionIdRaiz)
            ? { ...p, reposts_count: payload.reposts_count }
            : p,
        );

        const nuevo = payload.nuevaPublicacion;
        if (!nuevo?.id) return patched;
        if (patched.some((p) => p.id === nuevo.id)) return patched;
        return [nuevo, ...patched];
      });
    }

    socket.on("publicacion:like", onLike);
    socket.on("publicacion:comentario", onComment);
    socket.on("publicacion:repost", onRepost);

    return () => {
      socket.off("publicacion:like", onLike);
      socket.off("publicacion:comentario", onComment);
      socket.off("publicacion:repost", onRepost);
    };
  }, [user?.id]);

  // 2. Función para actualizar el Feed instantáneamente al crear un post
  const handleNewPost = (nuevoPost) => {
    const base = nuevoPost?.data ?? nuevoPost;
    if (!base?.id) return;

    const normalized = {
      ...base,
      id_publicacion_raiz: base.id_publicacion_raiz ?? base.id,
      liked_by_me: base.liked_by_me ?? false,
      comentarios_count: base.comentarios_count ?? 0,
      reposts_count: base.reposts_count ?? 0,
      likes_count: base.likes_count ?? 0,
    };

    setPosts((prevPosts) => [normalized, ...prevPosts]);
  };

  return (
    <Layout>
      {/* Pestañas Superiores */}
      <section className={styles.Parati}>
        <div
          className={`${styles.TabItem} ${step === 1 ? styles.active : ""}`}
          onClick={() => setStep(1)}
        >
          <Button
            label={<div className={styles.Texto}><p>Para ti</p></div>}
            styles={styles}
            title="Para ti"
          />
        </div>
        <div
          className={`${styles.TabItem} ${step === 2 ? styles.active : ""}`}
          onClick={() => setStep(2)}
        >
          <Button
            label={<div className={styles.Texto}><p>Siguiendo</p></div>}
            styles={styles}
            title="Seguidos"
          />
        </div>
      </section>

      <div className={styles.MainContent}>
        {/* Renderizado del Editor - LE PASAMOS LA FUNCIÓN DE ACTUALIZACIÓN */}
        <section className={styles.EditorContainer}>
          <PostEditor onPostCreated={handleNewPost} />
        </section>

        {/* Contenedor para el Feed de publicaciones */}
        <section className={styles.FeedContainer}>
          {loading ? (
            <div className={styles.FeedPlaceholder}>Cargando publicaciones...</div>
          ) : posts.length > 0 ? (
            // RENDERIZADO DINÁMICO DE POSTS
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user?.id}
                onPatchByRaiz={onPatchByRaiz}
                onPrependPost={onPrependPost}
              />
            ))
          ) : (
            <div className={styles.FeedPlaceholder}>
              {step === 1
                ? "No hay publicaciones globales aún."
                : "No sigues a nadie o no hay publicaciones."}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}