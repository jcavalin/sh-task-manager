const labels = {
    authentication_failed: 'Authentication failed',
    not_authorized: 'Not authorized',
    token_not_found: 'Token not found',
    token_invalid: 'Invalid token',
    user_not_found: 'User not found',
    internal_error: 'Internal error',
    forbidden: 'Forbidden'
};

export default (label) => labels[label];