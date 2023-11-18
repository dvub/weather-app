import { WeatherAPIResponse } from '@/types';
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { SphereGeometry } from 'three';
import * as THREE from 'three';
import { getRandomNumber } from '@/lib/index';
import React from 'react';

const Stars = (props: { count: number }) => {
	const positions = [];
	for (let i = 0; i < props.count; i++) {
		const position = new THREE.Vector3(
			getRandomNumber(-250, 250),
			getRandomNumber(-250, 250),
			getRandomNumber(-25, 0)
		);
		positions.push(position);
	}
	return positions.map((position: THREE.Vector3) => {
		return (
			<mesh key={position.length()} position={position}>
				<sphereGeometry args={[0.5, 16, 16]} />
				<meshStandardMaterial color='red' />
			</mesh>
		);
	});
};

export default function WeatherBackground(props: {
	weather: WeatherAPIResponse;
}) {
	return (
		<div className='absolute w-full h-full'>
			<Canvas
				className=' bg-black'
				camera={{ position: new THREE.Vector3(0, 0, 0) }}
			>
				<ambientLight />
				<Stars count={100} />
			</Canvas>
		</div>
	);
}
