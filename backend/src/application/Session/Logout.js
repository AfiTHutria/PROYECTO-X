export class Logout {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    async execute() {
        return await this.sessionRepository.deleteSession();
    }
}