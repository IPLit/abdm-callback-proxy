const delegateRepository: { [key: string]: string } = {
  'Bahmni': 'dev.bahmnilite.in', // do not remove, it is required for mock tests
  'shreeclinic': 'shreeclinic.bahmnilite.in',
  'iplitclinic1': 'clinic1.bahmnilite.in',
  'clinic2': 'clinic2.bahmnilite.in',
  'iplitclinic3': 'clinic3.bahmnilite.in',
  'deodharhospital': 'deodharhospital.bahmnilite.in',
};

function delegate(request: NginxHTTPRequest) {
  if (
    request.headersIn['X-HIU-ID'] &&
    delegateRepository.hasOwnProperty(request.headersIn['X-HIU-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIU-ID: ${request.headersIn['X-HIU-ID']}`,
    );
    request.internalRedirect(
      `/delegate?delegate_url=${delegateUrl(
        request.uri,
        request.headersIn['X-HIU-ID'],
      )}`,
    );
  } else if (
    request.headersIn['X-HIP-ID'] &&
    delegateRepository.hasOwnProperty(request.headersIn['X-HIP-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIP-ID: ${request.headersIn['X-HIP-ID']}`,
    );
    request.internalRedirect(
      `/delegate?delegate_url=${delegateUrl(
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

function delegateUrl(requestUri: String, key: string): string {
  const delegatePath =
    delegateRepository[key] + requestUri.replace(/callback/i, 'hiprovider');

  return delegatePath;
}

export default { delegate };
