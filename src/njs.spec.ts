import { createMock } from 'ts-auto-mock';
import { On, method } from 'ts-auto-mock/extension';
import njs from './njs';

test('it should delegate callback to correct HIU based on the header', () => {
  const mockRequest: NginxHTTPRequest = createMock<NginxHTTPRequest>({
    args: {
      test: '123',
    },
    headersIn: {
      Cookie: 'login=success',
      host: 'local.test',
      'X-HIU-ID': 'Bahmni',
    },
    method: 'GET',
    uri: '/callback/v0.5/hip/on-fetch-modes',
    remoteAddress: 'localhost',
    httpVersion: '007',
  });
  const mockInternalRedirect = On(mockRequest).get(
    method((request) => request.internalRedirect),
  );

  njs.delegate(mockRequest);

  expect(mockInternalRedirect).toHaveBeenCalledTimes(1);
  expect(mockInternalRedirect).toBeCalledWith(
    '/delegate?delegate_url=dev.lite.mybahmni.in/hiprovider/v0.5/hip/on-fetch-modes',
  );
});

test('it should delegate callback to correct HIP based on the header', () => {
  const mockRequest: NginxHTTPRequest = createMock<NginxHTTPRequest>({
    args: {
      test: '123',
    },
    headersIn: {
      Cookie: 'login=success',
      host: 'local.test',
      'X-HIP-ID': 'Demo',
    },
    method: 'GET',
    uri: '/callback/testabc',
    remoteAddress: 'localhost',
    httpVersion: '007',
  });
  const mockInternalRedirect = On(mockRequest).get(
    method((request) => request.internalRedirect),
  );

  njs.delegate(mockRequest);

  expect(mockInternalRedirect).toHaveBeenCalledTimes(1);
  expect(mockInternalRedirect).toBeCalledWith(
    '/delegate?delegate_url=lite.mybahmni.in/hiprovider/testabc',
  );
});

test('return default response for inappropiate header', () => {
  const expectedSummary = getExpectedSummary();
  const mockRequest: NginxHTTPRequest = createMock<NginxHTTPRequest>({
    args: {
      test: '123',
    },
    headersIn: {
      Cookie: 'login=success',
      host: 'local.test',
      'X-HIU-ID': 'BogusHIU',
    },
    method: 'GET',
    uri: 'http://localhost',
    remoteAddress: 'localhost',
    httpVersion: '007',
  });
  const mockSendHeader = On(mockRequest).get(
    method((request) => request.sendHeader),
  );
  const mockSend = On(mockRequest).get(method((request) => request.send));
  const mockFinish = On(mockRequest).get(method((request) => request.finish));
  const mockInternalRedirect = On(mockRequest).get(
    method((request) => request.internalRedirect),
  );

  njs.delegate(mockRequest);

  expect(mockInternalRedirect).toHaveBeenCalledTimes(0);
  expect(mockSendHeader).toHaveBeenCalledTimes(1);
  expect(mockSend).toHaveBeenCalledTimes(1);
  expect(mockFinish).toHaveBeenCalledTimes(1);
  expect(mockSend).toHaveBeenCalledWith(expectedSummary);
});

function getExpectedSummary() {
  let summary: string;

  summary = 'JS summary\n\n';
  summary += 'Method: GET\n';
  summary += 'HTTP version: 007\n';
  summary += 'Host: local.test\n';
  summary += 'Remote Address: localhost\n';
  summary += 'URI: http://localhost\n';
  return summary;
}
