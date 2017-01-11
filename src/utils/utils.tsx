export function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export function includes<T>(container: T[], target: T): boolean {
    return container.indexOf(target) !== -1;
}

interface Predicate<T> {
    (value: T, index?: number): boolean;
}

export function reject<T>(container: T[], iteratee: Predicate<T>): T[] {
    return container.filter(value => !iteratee(value));
}