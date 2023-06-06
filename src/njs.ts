 // do not remove, it is required for mock tests -- 'Bahmni': 'dev.bahmnilite.in'
const delegateRepository: { [key: string]: string } = {
  'Bahmni': 'dev.bahmnilite.in',
  'shreeclinic': 'shreeclinic.bahmnilite.in',
  'iplitclinic1': 'clinic1.bahmnilite.in',
  'clinic2': 'clinic2.bahmnilite.in',
  'iplitclinic3': 'clinic3.bahmnilite.in',
  'deodharhospital': 'deodharhospital.bahmnilite.in',
};

function delegate(request: NginxHTTPRequest) {

  let upperCaseHeaders: {};
  Object.keys(request.headersIn).forEach((headerKey) => {
	request.log('request headersIn headerKey ' + headerKey);
	upperCaseHeaders[headerKey.toUpperCase()] = request.headersIn[headerKey];
  });

  if (
    upperCaseHeaders['X-HIU-ID'] &&
    delegateRepository.hasOwnProperty(upperCaseHeaders['X-HIU-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIU-ID: ${upperCaseHeaders['X-HIU-ID']}`,
    );
    request.internalRedirect(
      `/delegate?delegate_url=${delegateUrl(
        request.uri,
        upperCaseHeaders['X-HIU-ID'],
      )}`,
    );
  } else if (
    upperCaseHeaders['X-HIP-ID'] &&
    delegateRepository.hasOwnProperty(upperCaseHeaders['X-HIP-ID'].toString())
  ) {
    request.log(
      `routing for headersIn.X-HIP-ID: ${upperCaseHeaders['X-HIP-ID']}`,
    );
    request.internalRedirect(
      `/delegate?delegate_url=${delegateUrl(
        request.uri,
        upperCaseHeaders['X-HIP-ID'],
      )}`,
    );
  } else {
    request.log(`No heders matched - showing summary`);
    if (upperCaseHeaders['X-HIP-ID']) {
       request.log(
         `routing for headersIn.X-HIP-ID: ${upperCaseHeaders['X-HIP-ID']}`,
       );
    }
    if (upperCaseHeaders['X-HIU-ID']) {
      request.log(
        `routing for headersIn.X-HIU-ID: ${upperCaseHeaders['X-HIU-ID']}`,
      );
    }
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
