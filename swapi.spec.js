const request = require('supertest')

test('Deve visualizar informações de cadastro, quando buscar por uma pessoa existente', async ()=> {
    // /people/1
    const resposta = await request('https://swapi.dev/api').get('/people/1');

    // verifica se o status da requisição está retornando verdadeiro com status 200
    expect(resposta.status).toBe(200);
    // verificando a garantia se essas informações existem, não sendo indefinida
    expect(resposta.body.filmes).toBeDefines();
    // verificando se a recupera no corpo de conteúdo, um ou mais veóculos (aeronaves)
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    // verificando se recupera um conteúdo expecífico, por exemplo o nome da primeira pessoa
    expect(resposta.body.name).toBe('Luke Skywalker');

});

test('Deve receber uma mensagem de erro, quando buscar por uma pessoa inexistente', async () => {
    const resposta = await request('https://swapi.dev/api').get('/people/9999');
    // verifica se o status da requisição está retornando falso com status 400
    expect(resposta.status).toBe(404);
    // verifica o valor do corpo vazio não encontrado;
    expect(resposta.body.detail).toBe('Not found')
    // verifica corpo vazio como objeto
    expect(resposta.body).toMatchObject({
        detail: 'Not found'
    });
    
});