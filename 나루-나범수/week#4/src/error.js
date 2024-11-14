export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class EmptyStoreError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionInProgressError extends Error {
  constructor(reason = "이미 진행 중인 미션입니다.", data = {}) {
    super(reason);
    this.name = "MissionInProgressError";
    this.errorCode = "M001";
    this.data = data;
  }
}