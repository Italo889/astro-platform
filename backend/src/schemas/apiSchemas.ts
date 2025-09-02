// src/schemas/apiSchemas.ts

export const userSchemas = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      createdAt: { type: 'string', format: 'date-time' },
      isBetaTester: { type: 'boolean' },
      betaTesterNumber: { type: 'number', nullable: true },
      badges: { type: 'array', items: { type: 'object' } }
    }
  },
  RegisterRequest: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 100 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    }
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      user: { $ref: '#/definitions/User' },
      tokens: {
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' }
        }
      }
    }
  }
};

export const calculationSchemas = {
  PersonalInfo: {
    type: 'object',
    required: ['name', 'birthDate', 'birthTime', 'birthPlace', 'geonameId'],
    properties: {
      name: { type: 'string' },
      birthDate: { type: 'string', format: 'date' },
      birthTime: { type: 'string', pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' },
      birthPlace: { type: 'string' },
      geonameId: { type: 'number' }
    }
  },
  CalculationRequest: {
    type: 'object',
    required: ['personalInfo'],
    properties: {
      personalInfo: { $ref: '#/definitions/PersonalInfo' }
    }
  },
  SynastryRequest: {
    type: 'object',
    required: ['person1', 'person2'],
    properties: {
      person1: { $ref: '#/definitions/PersonalInfo' },
      person2: { $ref: '#/definitions/PersonalInfo' }
    }
  }
};

export const changelogSchemas = {
  ChangelogChange: {
    type: 'object',
    required: ['type', 'description', 'icon'],
    properties: {
      type: { 
        type: 'string', 
        enum: ['feature', 'fix', 'improvement', 'security'] 
      },
      description: { type: 'string' },
      icon: { type: 'string' }
    }
  },
  Changelog: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      version: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string', nullable: true },
      releaseDate: { type: 'string', format: 'date-time' },
      isPublished: { type: 'boolean' },
      changes: {
        type: 'array',
        items: { $ref: '#/definitions/ChangelogChange' }
      },
      createdBy: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      createdAt: { type: 'string', format: 'date-time' }
    }
  },
  CreateChangelogRequest: {
    type: 'object',
    required: ['version', 'title', 'changes'],
    properties: {
      version: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      isPublished: { type: 'boolean', default: false },
      changes: {
        type: 'array',
        items: { $ref: '#/definitions/ChangelogChange' }
      }
    }
  }
};

export const errorSchemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      error: { type: 'string' },
      code: { type: 'string' }
    }
  }
};

export const commonSchemas = {
  SuccessResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: true },
      message: { type: 'string' }
    }
  }
};

// Combinar todos os schemas
export const allSchemas = {
  ...userSchemas,
  ...calculationSchemas,
  ...changelogSchemas,
  ...errorSchemas,
  ...commonSchemas
};
