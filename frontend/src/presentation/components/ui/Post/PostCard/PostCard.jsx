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

export default function PostCard({ post }) {
    // Extraemos los datos basándonos en tu respuesta JSON
    const { contenido, created_at, usuarios, imagen_url, likes_count } = post;
    
    // Formatear fecha simple (puedes usar date-fns después)
    const fecha = new Date(created_at).toLocaleDateString();

    return (
        <div className={styles.card}>
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
                <div className={styles.header}>
                    <span className={styles.name}>{usuarios?.Nombre || "Usuario"}</span>
                    <span className={styles.username}>@{usuarios?.Nombre?.toLowerCase().replace(/\s/g, '')}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.date}>{fecha}</span>
                </div>

        {mostrarTextoPrincipal && <div className={styles.text}>{contenido}</div>}

        {imagen_url && !isRepost && (
          <div className={styles.imageContainer}>
            <img src={imagen_url} alt="Post content" className={styles.postImage} />
          </div>
        )}

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

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={toggleComments}
            aria-label="Comentarios"
          >
            <RiChat1Line />
            <span>{comentarios_count ?? 0}</span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleRepost}
            disabled={!currentUserId || repostBusy}
            aria-label="Repost"
          >
            <RiRepeatLine />
            <span>{reposts_count ?? 0}</span>
          </button>

          <button
            type="button"
            className={`${styles.actionBtn} ${styles.heart} ${liked_by_me ? styles.liked : ""}`}
            onClick={handleLike}
            disabled={!currentUserId || likeBusy}
            aria-label="Me gusta"
          >
            {liked_by_me ? <RiHeartFill /> : <RiHeartLine />}
            <span>{likes_count ?? 0}</span>
          </button>

          <button type="button" className={styles.actionBtn} aria-label="Compartir">
            <RiShareLine />
          </button>
        </div>

        {showComments && (
          <div className={styles.comments} onClick={(e) => e.stopPropagation()}>
            {loadingComments ? (
              <div className={styles.commentsHint}>Cargando comentarios…</div>
            ) : comments.length === 0 ? (
              <div className={styles.commentsHint}>Aún no hay comentarios.</div>
            ) : (
              <ul className={styles.commentList}>
                {comments.map((c) => (
                  <li key={c.id} className={styles.commentItem}>
                    <div className={styles.commentMeta}>
                      <strong>{c.usuarios?.Nombre || "Usuario"}</strong>
                      <span className={styles.commentDate}>
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className={styles.commentBody}>{c.contenido}</div>
                  </li>
                ))}
              </ul>
            )}

            <form className={styles.commentForm} onSubmit={handleSubmitComment}>
              <textarea
                className={styles.commentInput}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={currentUserId ? "Escribe un comentario…" : "Inicia sesión para comentar"}
                disabled={!currentUserId || commentBusy}
                rows={2}
              />
              <button
                type="submit"
                className={styles.commentSubmit}
                disabled={!currentUserId || commentBusy || !commentText.trim()}
              >
                Comentar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
