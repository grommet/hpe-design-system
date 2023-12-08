'use server'

import { ComponentType } from "@/utilities/types";

export async function update(component: ComponentType) {
  const url = `${process.env.API_URL}/components/${component.id}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(component),
  };
  
  try {
    const res = await fetch(url, options);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
  
}