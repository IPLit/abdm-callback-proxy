const deligateRepository: { [key: string]: string } = {
  Bahmni: 'dev.lite.mybahmni.in',
  'Bahmni-QA': 'qa.lite.mybahmni.in',
  Demo: 'lite.mybahmni.in',
  performance: 'performance.lite.mybahmni.in',
};

function deligate(request: NginxHTTPRequest) {
  if (
    request.headersIn['X-HIU-ID'] &&
    deligateRepository.hasOwnProperty(request.headersIn['X-HIU-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIU-ID: ${request.headersIn['X-HIU-ID']}`,
    );
    request.internalRedirect(
      `/deligate?deligate_url=${deligateUrl(
        request.uri,
        request.headersIn['X-HIU-ID'],
      )}`,
    );
  } else if (
    request.headersIn['X-HIP-ID'] &&
    deligateRepository.hasOwnProperty(request.headersIn['X-HIP-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIP-ID: ${request.headersIn['X-HIP-ID']}`,
    );
    request.internalRedirect(
      `/deligate?deligate_url=${deligateUrl(
        request.uri,
        request.headersIn['X-HIP-ID'],
      )}`,
    );
  } else {
    request.log(`No heders matched - showing summary`);
    let summary: string;
    summary = 'JS summary\n\n';
    summary += 'Method: ' + request.method + '\n';
    summary += 'HTTP version: ' + request.httpVersion + '\n';
    summary += 'Host: ' + request.headersIn.host + '\n';
    summary += 'Remote Address: ' + request.remoteAddress + '\n';
    summary += 'URI: ' + request.uri + '\n';

    request.status = 200;
    request.headersOut['Content-Type'] = 'text/plain; charset=utf-8';
    request.sendHeader();
    request.send(summary);

    request.finish();
  }
}

function deligateUrl(requestUri: String, key: string): string {
  const deligatePath =
    deligateRepository[key] + requestUri.replace(/callback/i, 'hiprovider');

  return deligatePath;
}

export default { deligate };
