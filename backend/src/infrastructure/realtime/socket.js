let ioInstance = null;

export function setIO(io) {
  ioInstance = io;
}

export function getIO() {
  return ioInstance;
}

export function emitToPublicacion(raizId, event, payload) {
  if (!ioInstance) return;
  ioInstance.to(`publicacion:${raizId}`).emit(event, payload);
  ioInstance.to("feed").emit(event, payload);
}

