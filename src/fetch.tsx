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
    "https://t1-es2-fe42005afc1a.herokuapp.com/empresa-tec/" + url,
    options
  );
  const dados = await response.json();

  if (!response.ok) {
    throw new Error(dados.message);
  }

  return dados;
}
