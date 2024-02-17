'use server';

import { revalidatePath } from 'next/cache';
import type { ComponentType, ResourceType } from '@/utilities/types.d.ts';

class ValidationError extends Error {
  validation: { errors: any; };

  constructor(message: string, validation: { errors: any }) {
    super(message);
    this.name = 'ValidationError';
    this.validation = validation;
  }
}

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
    return null;
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
    return null;
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
    return null;
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
    return null;
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
    return null;
  }
}

export async function updateResources(
  resourcesProp: ResourceType[], 
  componentId: string) 
  {
  const path = '/resources';
  const url = `${process.env.API_URL}${path}`;

  const resources = resourcesProp.map(resource => {
    return {
      id: resource.id,
      name: resource.name,
      type: typeof resource.type === 'object' ? 
        resource.type.value : resource.type,
      url: resource.url,
    };
  });

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resources),
  };
  
  try {
    const res = await fetch(url, options);
    if (res.status === 422) {
      const validation = await res.json();
      throw new ValidationError('Validation error', validation);
    }
    revalidatePath(path);
    if (componentId) revalidatePath(`/components/${componentId}/resources`);
    return res.json();
  }
  catch (error: any) {
    console.error(error);
    return error.validation;
  }
}

