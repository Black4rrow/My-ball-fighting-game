class UIObserver {
    listeners: {(): void}[] = []
    currentNumber: number = 0

    subscribe = (listener: () => void) => {
        this.listeners.push(listener)
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    getSnapshot = (): number =>{
        return this.currentNumber
    }

    emit() {
        this.currentNumber++
        this.listeners.forEach(listener => {
            listener()
        });
    }
}

const uiObserver = new UIObserver
export default uiObserver