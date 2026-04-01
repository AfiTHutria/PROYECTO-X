export class GetCurrentUser {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async execute(user) {
        if(!user||!user.id)return null;
        return await this.sessionRepository.findById(user.id);
    }
}