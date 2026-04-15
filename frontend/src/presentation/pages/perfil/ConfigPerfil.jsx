import { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout.jsx";
import styles from "./ConfigPerfil.module.css";
import Button from "../../components/ui/Button.jsx";
import { usuarioRepository } from "../../../infrastructure/repositories/UsuarioRepository.js";
import { useAuth } from "../../../contexts/AuthContext.jsx";

export default function ConfigPerfil() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    Nombre: "",
    username: "",
    bio: "",
    location: "",
    website: "",
    avatar_url: "",
    banner_url: "",
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const me = await usuarioRepository.getMe();
        if (cancelled) return;
        setForm({
          Nombre: me?.Nombre ?? "",
          username: me?.username ?? "",
          bio: me?.bio ?? "",
          location: me?.location ?? "",
          website: me?.website ?? "",
          avatar_url: me?.avatar_url ?? "",
          banner_url: me?.banner_url ?? "",
        });
      } catch (e) {
        if (!cancelled) setError(e.message || "Error cargando perfil");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const updated = await usuarioRepository.patchMe(form);
      // refrescar cache simple del usuario en contexto
      if (user && setUser) {
        setUser({ ...user, ...updated });
      }
    } catch (e) {
      setError(e.message || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Configurar perfil</h1>
          <Button
            label={saving ? "Guardando..." : "Guardar"}
            onClick={onSave}
            disabled={loading || saving}
            variant="secondary"
            styles={styles}
          />
        </header>

        {error && <div className={styles.error}>{error}</div>}
        {loading ? (
          <div className={styles.placeholder}>Cargando…</div>
        ) : (
          <div className={styles.form}>
            <div className={styles.row}>
              <label className={styles.label}>Nombre</label>
              <input className={styles.input} value={form.Nombre} onChange={onChange("Nombre")} />
            </div>

            <div className={styles.row}>
              <label className={styles.label}>Username</label>
              <input className={styles.input} value={form.username} onChange={onChange("username")} />
            </div>

            <div className={styles.row}>
              <label className={styles.label}>Bio</label>
              <textarea className={styles.textarea} value={form.bio} onChange={onChange("bio")} rows={4} />
            </div>

            <div className={styles.grid2}>
              <div className={styles.row}>
                <label className={styles.label}>Ubicación</label>
                <input className={styles.input} value={form.location} onChange={onChange("location")} />
              </div>

              <div className={styles.row}>
                <label className={styles.label}>Web</label>
                <input className={styles.input} value={form.website} onChange={onChange("website")} />
              </div>
            </div>

            <div className={styles.grid2}>
              <div className={styles.row}>
                <label className={styles.label}>Avatar URL</label>
                <input className={styles.input} value={form.avatar_url} onChange={onChange("avatar_url")} />
              </div>

              <div className={styles.row}>
                <label className={styles.label}>Banner URL</label>
                <input className={styles.input} value={form.banner_url} onChange={onChange("banner_url")} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

