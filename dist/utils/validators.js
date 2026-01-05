"use strict";
// src/utils/validators.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    // Valida se é uma URL válida
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    // Valida alias (sem espaços, caracteres especiais)
    static isValidAlias(alias) {
        const aliasRegex = /^[a-zA-Z0-9-_]+$/;
        return aliasRegex.test(alias) && alias.length >= 3 && alias.length <= 50;
    }
    // Sanitiza string removendo caracteres perigosos
    static sanitizeString(str) {
        return str.trim().replace(/[<>]/g, '');
    }
    // Valida título
    static isValidTitle(title) {
        return title.trim().length >= 1 && title.length <= 100;
    }
}
exports.Validators = Validators;
//# sourceMappingURL=validators.js.map