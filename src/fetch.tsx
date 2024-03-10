export async function fetchDados(url: string, method: string, content?: any) {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (content !== undefined) {
    options.body = JSON.stringify(content);
  }

  const response = await fetch(
    "http://localhost:3000/empresa-tec/" + url,
    options
  );
  const dados = await response.json();

  if (!response.ok) {
    throw new Error(dados.message);
  }

  return dados;
}
