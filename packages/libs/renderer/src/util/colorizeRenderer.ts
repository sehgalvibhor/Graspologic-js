/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Colorizer, GraphRenderer } from '../types'
import { getColor } from './getColor'

function getColorizer(colorizerFn: Colorizer = () => [1, 0, 0, 1]) {
	return (key: number) => {
		const arr = colorizerFn(key)
		return (
			((arr[3] * 255) << 24) +
			((arr[2] * 255) << 16) +
			((arr[1] * 255) << 8) +
			arr[0] * 255
		)
	}
}

/**
 * Applies a colorizer function to the graph renderer
 * @param renderer The renderer to colorize
 * @param colorizerFn The function to use to color the renderer
 */
export function colorizeRenderer(
	renderer: GraphRenderer,
	colorizerFn?: Colorizer,
) {
	const colorizer = getColorizer(colorizerFn)
	const colorMap = new Map()
	const nodeColors = new Map<string, number>()
	for (const node of renderer.scene.nodes()) {
		const newColor = getColor(colorMap, colorizer, node.community)
		node.color = newColor
		nodeColors.set(node.id || 'DEFAULT', newColor)
	}
	let nodeColor: number | undefined
	for (const edge of renderer.scene.edges()) {
		nodeColor = nodeColors.get(edge.source!)
		if (nodeColor !== undefined) {
			edge.color = nodeColor
		}
	}
}
