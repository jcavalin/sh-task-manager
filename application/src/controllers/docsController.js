import redoc from 'redoc-express';

function docsAction(req, res) {
    redoc({
        title: 'SH Tasks Manager System API Docs',
        specUrl: '/docs/v1/openapi.yaml',
    })(req, res);
}

function openApiAction(req, res) {
    res.sendFile('./docs/openapi.yaml', { root: '.' });
}

export {
    docsAction,
    openApiAction
};