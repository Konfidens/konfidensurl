import prisma from "./prisma";

export interface Link {
  url: string;
  path: string;
  expires: Date | null;
  clicks?: number;
}

// lager en ny link med url, path og expires som parametere
export async function newLink({ url, path, expires }: Link) {
  try {
    const res = await fetch('api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        path: path,
        expires: expires,
      }),
    });

    if (!res.ok) {
      console.log('Error: ', await res.json());
    }

    console.log("Successfully added new link with path: ", path)
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error: ", error)
  }
}

// får url, path og expires som paramater og oppdaterer linken til path-en som er gitt. 
// alle parameterene må være med, ellers blir de satt til default valuene sine
export async function updateLink({ url, path, expires}: Link) {
  try {
    const res = await fetch('api/links', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        path: path,
        expires: expires,
      })
    })

    if (!res.ok) {
      console.log('Error: ', await res.json());
    }

    console.log("Successfully updated link with path: ", path)
  } catch (error) {
    console.log("Error: ", error)
  }
}

// sletter linken med path-en den får som param
export async function deleteLink(path: string) {
  try {
    const res = await fetch('api/links', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: path,
      }),
    })

    if (!res.ok) {
      console.log('Error: ', await res.json());
    }

    console.log("Successfully deleted link with path: ", path)
  } catch (error) {
    console.log("Error: ", error)
  }
}

// henter alle linker som eksisterer
export async function getAllLinks() {
  const links = await prisma.links.findMany();
  console.log("Links: ", links)
  return links;
}

// henter en link basert på path som den får som parameter
export async function getLink(path: string) {
  const link = await prisma.links.findUnique({
    where: {
      path: path,
    },
  })
  return link
}
