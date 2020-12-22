function parse_error(value) {
  if (value === 'ContextInvalidatedError') {
    return ContextInvalidatedError
  } else if (value === 'ConnectionRefusedError') {
    return ConnectionRefusedError
  } else if (value === 'ParseError') {
    return ParseError
  } else if (value === 'GeneralError') {
    return GeneralError
  } else if (value === 'UnknownError') {
    return UnknownError
  } else if (value === 'RequestTimeout') {
    return RequestTimeout
  } else if (value === 'InternalServerError') {
    return InternalServerError
  } else if (value === 'BadRequest') {
    return BadRequest
  } else if (value === 'CharsPerTranslationExceeded') {
    return CharsPerTranslationExceeded
  } else if (value === 'TotalCharsExceeded') {
    return TotalCharsExceeded
  } else {
    throw 'Invalid class name value=' + value
  }
}

class Error {
  constructor(message) {
    this.message = message
  }
}

class ContextInvalidatedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ContextInvalidatedError'
  }
}

class ConnectionRefusedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ConnectionRefusedError'
  }
}

class ParseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ParseError'
  }
}

class GeneralError extends Error {
  constructor(message) {
    super(message)
    this.name = 'GeneralError'
  }
}

class UnknownError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnknownError'
  }
}

class RequestTimeout extends Error {
  constructor(message) {
    super(message)
    this.name = 'RequestTimeout'
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InternalServerError'
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequest'
  }
}

class CharsPerTranslationExceeded extends Error {
  constructor(message) {
    super(message)
    this.name = 'CharsPerTranslationExceeded'
  }
}

class TotalCharsExceeded extends Error {
  constructor(message) {
    super(message)
    this.name = 'TotalCharsExceeded'
  }
}

export {
  parse_error,
  ContextInvalidatedError,
  ConnectionRefusedError,
  ParseError,
  GeneralError,
  UnknownError,
  RequestTimeout,
  InternalServerError,
  BadRequest,
  CharsPerTranslationExceeded,
  TotalCharsExceeded
}
