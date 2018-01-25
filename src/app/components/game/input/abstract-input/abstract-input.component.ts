import {ResponseService} from '../../../../services/response.service';
import {PercentageService} from '../../../../services/percentage.service';


export abstract class AbstractInputComponent {

  public textErrorSubmission;
  public isTextErrorSubmissionHidden = true;

  constructor(protected responseService: ResponseService,
              protected percentageService: PercentageService) { }


  protected saveResponse(response, isTextResponse) {
    return this.responseService.save(response).then((body) => {
      this.percentageService.calculatePercentage();
      window.history.back();
    }).catch((error) => {
      this.handleResponseError(error);
      if (isTextResponse) {
        this.handleTextResponseError(error);
      }
    });
  }

  protected updateResponse(response, questionId, isTextResponse) {
    return this.responseService.update(response, questionId).then((body) => {
      window.history.back();
    }).catch((error) => {
      this.handleResponseError(error);
      if (isTextResponse) {
        this.handleTextResponseError(error);
      }
    });
  }

  protected updateImageResponse(response, questionId) {
    return this.responseService.delete(questionId).then(() => {
      this.saveResponse(response, false);
    }).catch((error) => {
      this.handleResponseError(error);
    });
  }

  /*private methods*/
  private handleTextResponseError(error) {
    const errors = JSON.parse(error._body);
    this.textErrorSubmission = '!!! ' + errors[0]['message']['en'];
    this.isTextErrorSubmissionHidden = false;
  }

  private handleResponseError(error) {
    console.log('error' + error);
  }
}
