interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects são objetos que não possuem identidade (ID).
 * Eles são definidos pelos seus atributos.
 * Se dois ValueObjects têm os mesmos atributos, eles são considerados iguais.
 */
export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props); 
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}