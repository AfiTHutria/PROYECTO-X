import Layout from "../../components/shared/Layout/Layout";
import Button from '../../components/ui/Button.jsx';
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PostEditor from "../../components/ui/Post/PostEditor/PostEditor.jsx";
import PostCard from "../../components/ui/Post/PostCard/PostCard.jsx";
import { PublicacionRepository } from "../../../infrastructure/repositories/PublicacionRepository.js";

export default function Home() {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]); // Estado para guardar las publicaciones
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Cargar el Feed desde el servidor
  useEffect(() => {
    const cargarFeed = async () => {
      try {
        setLoading(true);
        const response = await PublicacionRepository.listar();
        
        // Verificamos si la data viene en .data (por Axios/Backend) o directa
        const dataFinal = response.data || response;
        
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

  // 2. Función para actualizar el Feed instantáneamente al crear un post
  const handleNewPost = (nuevoPost) => {
    // El nuevo post viene del editor, lo ponemos de primero
    setPosts((prevPosts) => [nuevoPost, ...prevPosts]);
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
              <PostCard key={post.id} post={post} />
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