import { Socket, Server } from 'socket.io';
import { BandsRepository } from './band.repository';

class Sockets {

    private readonly bandRepository: BandsRepository;

    constructor(
        private readonly io: Server,
    ) {

        this.bandRepository = new BandsRepository();

        this.handleSocketEvents();
    }

    handleSocketEvents(): void {
        // On connection
        this.io.on('connection', (socket: Socket) => {
            console.log('Client connected');
            // Emit all conected clients all bands info
            socket.emit(
                'current-bands',
                this.bandRepository.bands,
            );
        });
    }

}

export {
    Sockets,
};
