import {ErrorsLanguage} from './errors-language.enum';

export class Config {

  private static selectedErrorsLanguage = ErrorsLanguage.fr;

  static getSelectedErrorsLanguage() {
    return ErrorsLanguage[Config.selectedErrorsLanguage];
  }

}
