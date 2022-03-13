import {
  afterEach, describe, expect,
  test
} from '@jest/globals'
import superTest from 'supertest'
import Database from '../../src/database.js'
import Server from '../../src/server.js'

//  flaky
/*
DESAFIO PARA QUEM ASSISTIU:

Fazer com que Rodar o POST primeiro, não suge o GET
https://youtu.be/hQB139HP3GE
*/
describe('API E2E Test Suite', () => {

  afterEach(() => {
    Database.clear();
  })

  test('POST /  - should save an item and return ok', async () => {
    const response = await superTest(Server)
      .post('/')
      .send({
        nome: 'erickwendel',
        age: 27
      })
    const expectedResponse = { ok: 1 }
    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse)
  })

  test('GET /  - should return an array', async () => {
    const response = await superTest(Server)
      .get('/')

    const data = JSON.parse(response.text)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })

  test('DELETE /  - should delete all items and return ok', async () => {
    await superTest(Server)
      .post('/')
      .send({
        nome: 'erickwendel',
        age: 27
      })

    const deleteResponse = await superTest(Server)
      .delete('/')
    const expectedResponse = { ok: 1 }
    expect(JSON.parse(deleteResponse.text)).toStrictEqual(expectedResponse)

    const getResponse = await superTest(Server)
      .get('/')

    const data = JSON.parse(getResponse.text)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })
})