export type ActionResult<TData = void, TFields extends string = never> =
  | {
      success: true;
      data?: TData;
    }
  | {
      success: false;
      error?: string;
      fieldErrors?: Partial<Record<TFields, string>>;
    };

