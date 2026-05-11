import { useEffect, useMemo, useState } from "react";
import styles from "./PostCard.module.css";
import {
  RiHeartLine,
  RiHeartFill,
  RiChat1Line,
  RiRepeatLine,
  RiShareLine,
} from "react-icons/ri";
import LogoDefault from "../../../../../presentation/assets/images/LOGO_X.jpeg";
import { PublicacionRepository } from "../../../../../infrastructure/repositories/PublicacionRepository.js";
import { socket } from "../../../../../infrastructure/realtime/socket.js";
import { useNavigate } from "react-router-dom";

function raizDe(post) {
  return post.id_publicacion_raiz ?? post.id;
}

export default function PostCard({ post, currentUserId, onPatchByRaiz, onPrependPost }) {
  const navigate = useNavigate();
  const raiz = useMemo(() => raizDe(post), [post]);

  const original = post.original_publicacion;
  const isRepost = Boolean(post.id_publicacion_original);

  const {
    contenido,
    usuarios,
    imagen_url,
    likes_count = 0,
    comentarios_count = 0,
    reposts_count = 0,
    liked_by_me = false,
  } = post;


  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [likeBusy, setLikeBusy] = useState(false);
  const [repostBusy, setRepostBusy] = useState(false);
  const [commentBusy, setCommentBusy] = useState(false);

  // --- Efectos Socket ---
  useEffect(() => {
    socket.emit("publicacion:join", { publicacionIdRaiz: raiz });
    return () => socket.emit("publicacion:leave", { publicacionIdRaiz: raiz });
  }, [raiz]);

  useEffect(() => {
    if (!showComments) return;
    function onComment(payload) {
      if (payload.publicacionIdRaiz !== raiz) return;
      if (!payload.comentario?.id) return;
      setComments((prev) => {
        if (prev.some((c) => c.id === payload.comentario.id)) return prev;
        return [...prev, payload.comentario];
      });
    }
    socket.on("publicacion:comentario", onComment);
    return () => socket.off("publicacion:comentario", onComment);
  }, [showComments, raiz]);

  // --- Carga de Comentarios ---
  useEffect(() => {
    if (!showComments) return;
    let cancelled = false;
    (async () => {
      setLoadingComments(true);
      try {
        const data = await PublicacionRepository.listarComentarios(post.id);
        if (!cancelled) setComments(data.comentarios || []);
      } catch {
        if (!cancelled) setComments([]);
      } finally {
        if (!cancelled) setLoadingComments(false);
      }
    })();
    return () => { cancelled = true; };
  }, [showComments, post.id]);

  // --- Handlers ---
  const textoPrincipal = (contenido || "").trim();
  const mostrarTextoPrincipal = !isRepost || textoPrincipal.length > 0;

  async function handleLike(e) {
    e.stopPropagation();
    if (!currentUserId || likeBusy) return;
    const prevLiked = Boolean(liked_by_me);
    const prevCount = Number(likes_count || 0);
    const nextLiked = !prevLiked;
    const nextCount = Math.max(0, prevCount + (nextLiked ? 1 : -1));

    onPatchByRaiz?.(raiz, { liked_by_me: nextLiked, likes_count: nextCount });
    setLikeBusy(true);
    try {
      const result = await PublicacionRepository.toggleLike(post.id);
      onPatchByRaiz?.(result.idRaiz, { likes_count: result.likes_count, liked_by_me: result.liked });
    } catch {
      onPatchByRaiz?.(raiz, { liked_by_me: prevLiked, likes_count: prevCount });
    } finally { setLikeBusy(false); }
  }

  async function handleRepost(e) {
    e.stopPropagation();
    if (!currentUserId || repostBusy) return;
    setRepostBusy(true);
    try {
      const result = await PublicacionRepository.repost(post.id);
      if (result.repost?.id) onPrependPost?.(result.repost);
      onPatchByRaiz?.(result.idRaiz, { reposts_count: result.reposts_count });
    } finally { setRepostBusy(false); }
  }

  async function handleSubmitComment(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUserId || commentBusy || !commentText.trim()) return;
    setCommentBusy(true);
    try {
      const result = await PublicacionRepository.crearComentario(post.id, commentText);
      setComments((prev) => [...prev, result.comentario]);
      setCommentText("");
      onPatchByRaiz?.(result.idRaiz, { comentarios_count: result.comentarios_count });
    } finally { setCommentBusy(false); }
  }

  return (
    <div className={styles.card} onClick={() => post?.usuarios?.id && navigate(`/u/${post.usuarios.id}`)}>
      
      {/* Lado Izquierdo: Avatar */}
      <div className={styles.avatarContainer}>
        <img
          src={usuarios?.avatar_url || LogoDefault}
          alt={usuarios?.Nombre}
          className={styles.avatar}
        />
      </div>

      {/* Lado Derecho: Contenido */}
      <div className={styles.content}>
        {isRepost && <div className={styles.repostBanner}>🔁 Reposteado</div>}

        <div className={styles.header}>
          <span className={styles.name}>{usuarios?.Nombre || "Usuario"}</span>
          <span className={styles.username}>
            @{usuarios?.Nombre?.toLowerCase().replace(/\s/g, "")}
          </span>
          <span className={styles.dot}>·</span>
          
        </div>

        {mostrarTextoPrincipal && <div className={styles.text}>{contenido}</div>}

        {imagen_url && !isRepost && (
          <div className={styles.imageContainer}>
            <img src={imagen_url} alt="Post content" className={styles.postImage} />
          </div>
        )}

        {/* Publicación Original en caso de Repost */}
        {original?.id && (
          <div className={styles.quoted}>
            <div className={styles.quotedHeader}>
              <span className={styles.name}>{original.usuarios?.Nombre || "Usuario"}</span>
              <span className={styles.username}>
                @{original.usuarios?.Nombre?.toLowerCase().replace(/\s/g, "")}
              </span>
            </div>
            <div className={styles.quotedText}>{original.contenido}</div>
            {original.imagen_url && (
              <div className={styles.imageContainer}>
                <img src={original.imagen_url} alt="" className={styles.postImage} />
              </div>
            )}
          </div>
        )}

        {/* Botones de Acción */}
        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}>
            <RiChat1Line />
            <span>{comentarios_count}</span>
          </button>

          <button type="button" className={styles.actionBtn} onClick={handleRepost} disabled={!currentUserId || repostBusy}>
            <RiRepeatLine />
            <span>{reposts_count}</span>
          </button>

          <button type="button" className={`${styles.actionBtn} ${liked_by_me ? styles.liked : ""}`} onClick={handleLike} disabled={!currentUserId || likeBusy}>
            {liked_by_me ? <RiHeartFill className={styles.heartFill} /> : <RiHeartLine />}
            <span>{likes_count}</span>
          </button>

          <button type="button" className={styles.actionBtn}>
            <RiShareLine />
          </button>
        </div>

        {/* Sección de Comentarios */}
        {showComments && (
          <div className={styles.comments} onClick={(e) => e.stopPropagation()}>
            {loadingComments ? (
              <div className={styles.commentsHint}>Cargando...</div>
            ) : (
              <ul className={styles.commentList}>
                {comments.map((c) => (
                  <li key={c.id} className={styles.commentItem}>
                    <strong>{c.usuarios?.Nombre}</strong>: {c.contenido}
                  </li>
                ))}
              </ul>
            )}
            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <textarea
                className={styles.commentInput}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribe un comentario..."
                disabled={!currentUserId || commentBusy}
              />
              <button type="submit" className={styles.commentSubmit} disabled={!currentUserId || commentBusy || !commentText.trim()}>
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}