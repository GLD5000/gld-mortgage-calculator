import { useSearchParams } from 'next/navigation';
import { createStringSwitcher } from './objectUtils';
// import { Dispatch, SetStateAction } from 'react';

export function getParam(param: string) {
    if (!window) return undefined;
    const searchString = window.location.search;
    const searchParams = new URLSearchParams(searchString);
    return decodeURIComponent(`${searchParams.get(param)}`);
}

export function setParam(param: string, value: string) {
    if (!window) return undefined;

    if (!value || value === null || value === 'null' || value === '') {
        deleteParam(param);
    } else {
        const searchString = window.location.search;
        const searchParams = new URLSearchParams(searchString);
        searchParams.set(
            param,
            encodeURIComponent(value !== null && value !== 'null' ? value : '')
        );
        makeUrl(searchParams);
    }
}

function deleteParam(param: string) {
    if (!window) return undefined;
    const searchString = window.location.search;
    const searchParams = new URLSearchParams(searchString);
    searchParams.delete(param);
    makeUrl(searchParams);
}

function makeUrl(searchParams: URLSearchParams) {
    const newUrl =
        searchParams.size > 0
            ? `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams}`
            : `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.replaceState({}, '', newUrl);
}

export function useQueryParamsArray(
    paramKey: string
    //eslint-disable-next-line
): [string[], (valueIn: string) => void] {
    const [state, setState] = useQueryParams(paramKey);
    function updateState(newValue: string) {
        const current = getState();
        if (!current) {
            setState(JSON.stringify([newValue]));
            return;
        } else if (current.includes(newValue)) {
            const newArray = current.filter((string) => string !== newValue);
            if (newArray.length === 0) {
                deleteParam(paramKey);
                setState('');
            } else {
                setState(JSON.stringify(newArray));
            }
        } else {
            current.push(newValue);
            const newString = JSON.stringify(current);
            setState(newString);
        }
    }
    function getState() {
        const current = state ? (JSON.parse(state) as string[]) : [];
        if (!current) {
            deleteParam(paramKey);
        }
        return current;
    }
    const returnState = getState();
    return [returnState, updateState];
}

export function useQueryParams(
    paramKey: string,
    initialValue?: string
    // eslint-disable-next-line
): [string, (value: string) => void] {
    const searchParams = useSearchParams();
    const state = searchParams.get(paramKey) || initialValue || '';

    return [
        decodeURIComponent(state),
        (value) => {
            setState(value, paramKey);
        },
    ];
}
function setState(value: string, paramKey: string) {
    if (!value || value === null || value === 'null' || value === '') {
        deleteParam(paramKey);
    } else {
        const searchString = window.location.search;
        const searchParams = new URLSearchParams(searchString);
        searchParams.set(
            paramKey,
            encodeURIComponent(value !== null && value !== 'null' ? value : '')
        );
        makeUrl(searchParams);
    }
}
export function useQueryParamsToggle(
    paramKey: string,
    optionsArray: string[]
    // eslint-disable-next-line
): [string, (value?: string) => void] {
    const searchParams = useSearchParams();
    const initialValue = optionsArray[0];
    const optionSwitcher = createStringSwitcher(optionsArray);
    const state = searchParams.get(paramKey) || initialValue || '';

    return [
        decodeURIComponent(state),
        // eslint-disable-next-line
        (value?: string) => {
            setState(value || optionSwitcher[state], paramKey);
        },
    ];
}
