// src/utils/validators.ts

export class Validators {
  // Valida se é uma URL válida
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Valida alias (sem espaços, caracteres especiais)
  static isValidAlias(alias: string): boolean {
    const aliasRegex = /^[a-zA-Z0-9-_]+$/;
    return aliasRegex.test(alias) && alias.length >= 3 && alias.length <= 50;
  }

  // Sanitiza string removendo caracteres perigosos
  static sanitizeString(str: string): string {
    return str.trim().replace(/[<>]/g, '');
  }

  // Valida título
  static isValidTitle(title: string): boolean {
    return title.trim().length >= 1 && title.length <= 100;
  }
}