export class RefreshToken {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute(token) {
        if (!token) return null;
        return await this.sessionRepository.refresehSession(token);
    }
}