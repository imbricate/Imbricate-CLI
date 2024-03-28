/**
 * @author WMXPY
 * @namespace Origin_Collection
 * @description Least Common Identifier
 */

export type LeastCommonIdentifierItem = {

    readonly key: string;
    readonly identifier: string;
};

class TrieNode {

    public static create(): TrieNode {

        return new TrieNode();
    }

    private _items: string[];
    private _children: Record<string, TrieNode>;

    private constructor() {

        this._items = [];
        this._children = {};
    }

    public get items(): string[] {
        return this._items;
    }

    public getChild(key: string): TrieNode {

        if (!this._children[key]) {
            this._children[key] = TrieNode.create();
        }

        return this._children[key];
    }

    public pushItem(item: string): void {

        this._items.push(item);
    }
}

export const mapLeastCommonIdentifier = (
    identifiers: LeastCommonIdentifierItem[],
): Record<string, string> => {

    const root: TrieNode = TrieNode.create();

    for (const identifier of identifiers) {

        let current: TrieNode = root;
        for (const char of identifier.identifier) {
            current.pushItem(identifier.key);
            current = current.getChild(char);
        }
    }

    const result: Record<string, string> = {};

    for (const identifier of identifiers) {

        let current: TrieNode = root;
        let currentIdentifier: string = "";

        for (const char of identifier.identifier) {

            current = current.getChild(char);
            currentIdentifier += char;

            if (current.items.length === 1) {
                break;
            }
        }

        result[identifier.key] = currentIdentifier;
    }

    return result;
};
