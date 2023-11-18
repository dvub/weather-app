import { WeatherAPIResponse } from '@/types';
import { Canvas } from '@react-three/fiber';
import { SphereGeometry } from 'three';
import * as THREE from 'three';
import { getRandomNumber } from '@/lib/index';

export default function WeatherBackground(props: {
	weather: WeatherAPIResponse;
}) {
	const sphere = () => {
		const position = new THREE.Vector3(
			getRandomNumber(-100, 100),
			getRandomNumber(-100, 100),
			getRandomNumber(0, 100)
		);
		return (
			<mesh position={position}>
				<sphereGeometry args={[0.5, 16, 16]} />
				<meshStandardMaterial color={'white'} />
			</mesh>
		);
	};

	const stars = new Array(1000).fill(sphere());

	return (
		<Canvas className='w-full h-[10rem ] absolute bg-black'>
			<ambientLight />
			{stars}
		</Canvas>
	);
}
