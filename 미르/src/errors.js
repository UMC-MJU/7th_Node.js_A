export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

export class DuplicateMissionError extends Error{
    errorCode = "M001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
      }
}

export class DuplicateReviewError extends Error{
    errorCode = "R001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateRegionNotFoundError extends Error{
    errorCode = "R002";

    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}