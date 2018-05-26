import * as React from 'react'


interface ComponentDecorator<TOriginalProps, TOuterProps> {
  (component: React.ComponentClass<TOriginalProps> | React.StatelessComponent<TOriginalProps>): React.ComponentClass<TOuterProps>;
}

export class SharedStore<State = {}> {
  state: State

  constructor(storeName: string, initialState?: any)
  public setState(partialState: Partial<State>): void
  public getState(): State
  public stateDidSet(oldState: State, newState: State): void
}

export class EnhancedComponent<Store extends SharedStore, P = any, S = any> extends React.Component<P, S> {
  sharedStore: Store
}

interface MapStateToProps<Store, TInnerProps, TOuterProps, > {
  (state: Store, ownProps: TOuterProps): TInnerProps;
}

export function getProvider<Store extends SharedStore>(
  name: string,
  StoreClass?: new(storeName: string, initialState?: any) => Store
):  {
  new(): EnhancedComponent<Store>
  connect<TInnerProps, TOuterProps>(mapStoreToProps: MapStateToProps<Store, TInnerProps, TOuterProps>): ComponentDecorator<TInnerProps, TOuterProps>
}

export function connect<Store, TInnerProps, TOuterProps>(
  name: string,
  mapStateToProps?: MapStateToProps<Store, TOuterProps, TInnerProps>,
): ComponentDecorator<TInnerProps, TOuterProps>;
