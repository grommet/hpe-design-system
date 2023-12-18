'use server'

import { ComponentType, ResourceType } from "@/utilities/types";
import { revalidatePath } from "next/cache";

export async function getComponent(id: string) {
  const url = `${process.env.API_URL}/components/${id}`;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  
  try {
    const res = await fetch(url, options);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
}

export async function updateComponent(component: ComponentType) {
  const path = `/components/${component.id}`;
  const url = `${process.env.API_URL}${path}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(component),
  };
  
  try {
    const res = await fetch(url, options);
    revalidatePath(path);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
  
}

export async function getResources(id: string) {
  const url = `${process.env.API_URL}/components/${id}/resources`;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  
  try {
    const res = await fetch(url, options);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
}

export async function addResource(id: string, resource: ResourceType) {
  const url = `${process.env.API_URL}/components/${id}/resources`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  };
  
  try {
    const res = await fetch(url, options);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
}

export async function updateResource(resource: ResourceType) {
  const path = `/resources/${resource.id}`;
  const url = `${process.env.API_URL}${path}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  };
  
  try {
    const res = await fetch(url, options);
    revalidatePath(path);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
}

export async function updateResources(resources: ResourceType[]) {
  const path = `/resources`;
  const url = `${process.env.API_URL}${path}`;

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resources),
  };
  
  try {
    const res = await fetch(url, options);
    revalidatePath(path);
    return res.json();
  }
  catch (error) {
    console.error(error);
  }
}

