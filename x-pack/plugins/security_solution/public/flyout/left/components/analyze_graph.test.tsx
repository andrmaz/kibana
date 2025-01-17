/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { LeftPanelContext } from '../context';
import { LeftFlyoutContext } from '../context';
import { TestProviders } from '../../../common/mock';
import { AnalyzeGraph } from './analyze_graph';
import { ANALYZE_GRAPH_ERROR_TEST_ID, ANALYZER_GRAPH_TEST_ID } from './test_ids';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useLocation: jest.fn().mockReturnValue({ pathname: '' }) };
});

jest.mock('../../../resolver/view/use_resolver_query_params_cleaner');

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  const original = jest.requireActual('react-redux');

  return {
    ...original,
    useDispatch: () => mockDispatch,
  };
});

describe('<AnalyzeGraph />', () => {
  it('renders analyzer graph correctly', () => {
    const contextValue = {
      eventId: 'eventId',
    } as unknown as LeftPanelContext;

    const wrapper = render(
      <TestProviders>
        <LeftFlyoutContext.Provider value={contextValue}>
          <AnalyzeGraph />
        </LeftFlyoutContext.Provider>
      </TestProviders>
    );
    expect(wrapper.getByTestId(ANALYZER_GRAPH_TEST_ID)).toBeInTheDocument();
  });

  it('should render error message on null eventId', () => {
    const contextValue = {
      eventId: null,
    } as unknown as LeftPanelContext;

    const wrapper = render(
      <TestProviders>
        <LeftFlyoutContext.Provider value={contextValue}>
          <AnalyzeGraph />
        </LeftFlyoutContext.Provider>
      </TestProviders>
    );
    expect(wrapper.getByTestId(ANALYZE_GRAPH_ERROR_TEST_ID)).toBeInTheDocument();
    expect(wrapper.getByText('Unable to display analyzer')).toBeInTheDocument();
    expect(wrapper.getByText('There was an error displaying analyzer')).toBeInTheDocument();
  });
});
