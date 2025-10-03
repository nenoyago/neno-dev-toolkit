import { Pipe, PipeTransform } from '@angular/core';

import { getRemoteErrorMessage } from '@nenoyago/common-utilities';
import { Observable, isObservable, map, startWith, catchError, of } from 'rxjs';

enum RequestStateEnum {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  failure = 'error'
}

export interface ObsWithStatusRequest<T> {
  type: RequestStateEnum;
  value?: T;
}

export interface ObsWithStatusResult<T> {
  loading: boolean;
  value?: T;
  error?: string;
}

export interface ObsWithStatusOptions {
  errorMessage?: string;
}

type UnwrapObservable<T> = T extends Observable<infer U> ? U : T;

const DEFAULT_ERROR_MESSAGE = 'Ocorreu um erro inesperado';

@Pipe({
  standalone: true,
  name: 'obsWithStatus'
})
export class ObsWithStatusPipe implements PipeTransform {
  transform<T>(
    val: Observable<ObsWithStatusRequest<T>> | T,
    options?: ObsWithStatusOptions
  ): Observable<ObsWithStatusResult<UnwrapObservable<T>>> {
    if (isObservable(val)) {
      return val.pipe(
        map((response: ObsWithStatusRequest<T> | T) => {
          if (this.isObsWithStatusRequest(response)) {
            if (response.type === RequestStateEnum.failure) {
              return {
                loading: false,
                error: options?.errorMessage || DEFAULT_ERROR_MESSAGE
              };
            }
            return {
              loading: false,
              value: response.value as UnwrapObservable<T>
            };
          }
          return {
            loading: false,
            value: response as UnwrapObservable<T>
          };
        }),
        startWith({ loading: true } as ObsWithStatusResult<
          UnwrapObservable<T>
        >),
        catchError((error) => {
          const errorMessage = getRemoteErrorMessage(
            error,
            options?.errorMessage || DEFAULT_ERROR_MESSAGE
          );
          return of({
            loading: false,
            error: errorMessage
          } as ObsWithStatusResult<UnwrapObservable<T>>);
        })
      );
    }

    return of({
      loading: false,
      value: (val as ObsWithStatusRequest<T>).value as UnwrapObservable<T>
    } as ObsWithStatusResult<UnwrapObservable<T>>);
  }

  private isObsWithStatusRequest<T>(obj: any): obj is ObsWithStatusRequest<T> {
    return obj && typeof obj.type === 'string';
  }
}
