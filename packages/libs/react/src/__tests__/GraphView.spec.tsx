/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { GraphRenderer } from '@graspologic/renderer'
import { mount } from 'enzyme'
import * as React from 'react'
import { GraphView } from '../GraphView'

const mountWithRef = (el: JSX.Element, options?: any) => {
	const WithRef = (): JSX.Element => el
	return mount(<WithRef />, options)
}

/**
 * TODO: This is skipped because somewhere in a dependency chain we import from @essex-js-toolkit/hooks, which is not published with CommonJS.
 */
describe('The Graph View', () => {
	it('can mock luma', () => {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const luma = require('luma.gl')
		expect(luma.mock).toEqual(true)
	})

	// eslint-disable-next-line jest/expect-expect
	it('can be mounted', () => {
		mount(
			<GraphView
				data={{
					edges: [{ source: 'A', target: 'B', weight: 1 }],
					nodes: [
						{ id: 'A', x: 1, y: 1 },
						{ id: 'B', x: -1, y: -1 },
					],
				}}
			/>,
		)
	})

	it('can be passed an imperative handle ref', () => {
		let apiRef: GraphRenderer | null = null
		mountWithRef(
			<GraphView
				ref={(r: GraphRenderer): void => {
					apiRef = r
				}}
				data={{
					edges: [{ source: 'A', target: 'B', weight: 1 }],
					nodes: [
						{ id: 'A', x: 1, y: 1 },
						{ id: 'B', x: -1, y: -1 },
					],
				}}
			/>,
		)
		expect(apiRef!).toBeDefined()
		expect(typeof apiRef!.changePositions).toEqual('function')
		expect(apiRef!.config).toBeDefined()
	})
})
