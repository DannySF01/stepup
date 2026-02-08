"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useFilters() {
  const router = useRouter();
  const params = useSearchParams();

  function setParam(key: string, value?: string) {
    const newParams = new URLSearchParams(params.toString());

    if (!value) newParams.delete(key);
    else {
      if (newParams.get(key)?.includes(value)) newParams.delete(key);
      else newParams.set(key, value);
    }

    router.push(`?${newParams.toString()}`);
  }

  function setArrayParams(updates: Record<string, string | undefined>) {
    const newParams = new URLSearchParams(params.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) newParams.delete(key);
      else newParams.set(key, value);
    });

    router.push(`?${newParams.toString()}`);
  }

  function toggleMultiParam(key: string, value: string) {
    const newParams = new URLSearchParams(params.toString());
    const current = newParams.get(key)?.split(",") ?? [];

    if (current.includes(value)) {
      const next = current.filter((v) => v !== value);
      if (next.length === 0) newParams.delete(key);
      else newParams.set(key, next.join(","));
    } else {
      newParams.set(key, [...current, value].join(","));
    }

    router.push(`?${newParams.toString()}`);
  }

  function isActive(key: string, value?: string) {
    const param = params.get(key);
    if (!param) return false;

    if (!value) return true;
    return param.split(",").includes(value);
  }

  function clearAll() {
    router.push(window.location.pathname);
  }

  return {
    params,
    setParam,
    setArrayParams,
    toggleMultiParam,
    isActive,
    clearAll,
  };
}
