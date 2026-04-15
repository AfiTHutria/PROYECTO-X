import api from "../api/Axios";

export class UsuarioRepository {
  async getMe() {
    const res = await api.get("/usuarios/me");
    return res.data?.data ?? res.data;
  }

  async patchMe(patch) {
    const res = await api.patch("/usuarios/me", patch);
    return res.data?.data ?? res.data;
  }

  async getPerfil(id) {
    const res = await api.get(`/usuarios/${id}`);
    return res.data?.data ?? res.data;
  }

  async toggleFollow(id) {
    const res = await api.post(`/usuarios/${id}/follow`);
    return res.data?.data ?? res.data;
  }

  async listFollowers(id) {
    const res = await api.get(`/usuarios/${id}/followers`);
    return res.data?.data ?? res.data;
  }

  async listFollowing(id) {
    const res = await api.get(`/usuarios/${id}/following`);
    return res.data?.data ?? res.data;
  }
}

export const usuarioRepository = new UsuarioRepository();

