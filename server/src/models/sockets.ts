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
        this.io.on('connection',
            (socket: Socket) => {
                console.log('Client connected');
                // Emit to conected client all bands info
                socket.emit(
                    'current-bands',
                    this.bandRepository.bands,
                );

                // Vote for band
                socket.on(
                    'vote-band',
                    ({ id }: { id: string }) => {
                        try {
                            this.bandRepository.increaseVotes(id);
                            this.io.emit('current-bands', this.bandRepository.bands);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                );
                // Delete band
                socket.on(
                    'delete-band',
                    ({ id }: { id: string }) => {
                        try {
                            this.bandRepository.removeBand(id);
                            this.io.emit('current-bands', this.bandRepository.bands);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                );
                // change band name
                socket.on(
                    'change-band-name',
                    ({ id, name }: { id: string; name: string }) => {
                        try {
                            this.bandRepository.changeName(id, name);
                            this.io.emit('current-bands', this.bandRepository.bands);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                );
                // change band name
                socket.on(
                    'add-band',
                    ({ name }: { name: string }) => {
                        try {
                            this.bandRepository.addBand(name);
                            this.io.emit('current-bands', this.bandRepository.bands);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                );
            }
        );
    }

}

export {
    Sockets,
};
