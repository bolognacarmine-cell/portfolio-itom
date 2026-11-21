import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '../../../../context/SceneContext';
import { useAchievements } from '../../../../context/AchievementsContext';
import { usePaintMaterial } from '../Gallery/usePaintMaterial';

const STUDIO_PAINT_CONFIG = {
    dirX: 0.0,
    dirY: -1.0,
    dirZ: 0.0,
    startDist: -10.0,
    endDist: 10.0,
    noiseAxes: 'xz'
};

function TattooMachine({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
    const metal = '#2a2a2e';
    const dark = '#111111';
    const copper = '#6b3f2a';
    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* body */}
            <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.32, 16]} />
                <meshBasicMaterial color={metal} />
            </mesh>
            {/* grip */}
            <mesh position={[0, 0.12, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.042, 0.038, 0.22, 16]} />
                <meshBasicMaterial color={dark} />
            </mesh>
            {/* tip */}
            <mesh position={[0, 0.12, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.018, 0.012, 0.08, 12]} />
                <meshBasicMaterial color={metal} />
            </mesh>
            {/* needle */}
            <mesh position={[0, 0.12, 0.39]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.003, 0.003, 0.12, 8]} />
                <meshBasicMaterial color="#888888" />
            </mesh>
            {/* coils */}
            <mesh position={[-0.065, 0.16, -0.02]}>
                <cylinderGeometry args={[0.055, 0.055, 0.07, 16]} />
                <meshBasicMaterial color={copper} />
            </mesh>
            <mesh position={[0.065, 0.16, -0.02]}>
                <cylinderGeometry args={[0.055, 0.055, 0.07, 16]} />
                <meshBasicMaterial color={copper} />
            </mesh>
            {/* frame */}
            <mesh position={[0, 0.18, -0.06]} rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.02, 0.18, 0.02]} />
                <meshBasicMaterial color={metal} />
            </mesh>
            <mesh position={[-0.08, 0.14, -0.04]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.015, 0.08, 0.015]} />
                <meshBasicMaterial color={metal} />
            </mesh>
            <mesh position={[0.08, 0.14, -0.04]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.015, 0.08, 0.015]} />
                <meshBasicMaterial color={metal} />
            </mesh>
        </group>
    );
}

function InkBottle({ position, color = '#111' }) {
    return (
        <group position={position}>
            <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.028, 0.03, 0.12, 12]} />
                <meshBasicMaterial color={color} />
            </mesh>
            <mesh position={[0, 0.135, 0]}>
                <cylinderGeometry args={[0.018, 0.02, 0.03, 12]} />
                <meshBasicMaterial color="#222" />
            </mesh>
        </group>
    );
}

function FlashFrame({ position, rotation = [0, 0, 0], size = [1, 1.4], textureUrl, label }) {
    const tex = useTexture(textureUrl);
    const aspect = size[0] / size[1];
    return (
        <group position={position} rotation={rotation}>
            {/* frame */}
            <mesh position={[0, 0, -0.02]}>
                <planeGeometry args={[size[0] + 0.12, size[1] + 0.12]} />
                <meshBasicMaterial color="#2b211a" />
            </mesh>
            {/* paper */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[size[0] + 0.02, size[1] + 0.02]} />
                <meshBasicMaterial color="#f5f0e6" />
            </mesh>
            {/* art */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[size[0], size[1]]} />
                <meshBasicMaterial map={tex} />
            </mesh>
        </group>
    );
}

const StudioRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
    const groupRef = useRef();
    const { camera } = useThree();
    const { isTeleporting } = useScene();
    const { showTutorial, hidePopup } = useAchievements();

    const hasSignaledReady = useRef(false);
    const frameCount = useRef(0);
    const FRAMES_TO_WAIT = 5;

    const { onBeforeCompile: paintOnBeforeCompile, animatePaint, resetPaint, uniformsData: paintUniforms, updateRoomOrigin } = usePaintMaterial(STUDIO_PAINT_CONFIG);
    const wasTeleportedRef = useRef(false);

    useEffect(() => {
        if (isTeleporting) wasTeleportedRef.current = true;
    }, [isTeleporting]);

    useEffect(() => {
        if (showRoom && !isWarmup) {
            if (wasTeleportedRef.current || isTeleporting) {
                paintUniforms.uPaintProgress.value = 1.0;
            } else {
                resetPaint();
                animatePaint(0.2, 2.0);
            }
        } else {
            paintUniforms.uPaintProgress.value = 1.0;
        }
    }, [showRoom, isWarmup, isTeleporting]);

    useEffect(() => {
        if (isExiting || isTeleporting) hidePopup?.();
    }, [isExiting, isTeleporting, hidePopup]);

    useFrame(() => {
        updateRoomOrigin(groupRef);
        if (hasSignaledReady.current) return;
        frameCount.current++;
        if (frameCount.current >= FRAMES_TO_WAIT) {
            hasSignaledReady.current = true;
            onReady?.();
            if (!isWarmup) setTimeout(() => showTutorial?.('studio_interact'), 1500);
        }
    });

    // Preload art textures
    useTexture('/textures/gallery/bioprzod.webp');
    useTexture('/textures/corridor/rysuneknaobraz1.webp');
    useTexture('/textures/corridor/rysuneknaobrazek3.webp');

    const floorY = -1.25;

    return (
        <group ref={groupRef} position={[0, 0, -2]}>
            {/* Ambient studio backdrop elements */}
            <mesh position={[0, 1.2, -4.5]} receiveShadow>
                <planeGeometry args={[10, 6]} />
                <meshBasicMaterial color="#f3eee4" />
            </mesh>
            {/* side walls hint */}
            <mesh position={[-3.2, 1.0, -2.5]} rotation={[0, Math.PI / 2.6, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color="#ece4d6" transparent opacity={0.5} />
            </mesh>
            <mesh position={[3.2, 1.0, -2.5]} rotation={[0, -Math.PI / 2.6, 0]}>
                <planeGeometry args={[5, 5]} />
                <meshBasicMaterial color="#ece4d6" transparent opacity={0.5} />
            </mesh>

            {/* Floor mat/rug */}
            <mesh position={[0, floorY + 0.01, -1.2]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[4.2, 3.2]} />
                <meshBasicMaterial color="#e6dccb" />
            </mesh>

            {/* Tattoo bed / lettino */}
            <group position={[-0.6, floorY, -1.4]} rotation={[0, 0.15, 0]}>
                {/* legs */}
                {[[-0.45, 0.22, -0.9], [0.45, 0.22, -0.9], [-0.45, 0.22, 0.9], [0.45, 0.22, 0.9]].map((p, i) => (
                    <mesh key={i} position={p}>
                        <cylinderGeometry args={[0.035, 0.035, 0.44, 12]} />
                        <meshBasicMaterial color="#4a4a4f" />
                    </mesh>
                ))}
                {/* base frame */}
                <mesh position={[0, 0.48, 0]}>
                    <boxGeometry args={[1.05, 0.08, 2.2]} />
                    <meshBasicMaterial color="#3f3f44" />
                </mesh>
                {/* cushion */}
                <mesh position={[0, 0.58, 0]}>
                    <boxGeometry args={[0.95, 0.14, 2.05]} />
                    <meshBasicMaterial color="#1d1c1b" />
                </mesh>
                {/* head rest */}
                <mesh position={[0, 0.68, -0.95]} rotation={[0.35, 0, 0]}>
                    <boxGeometry args={[0.85, 0.1, 0.55]} />
                    <meshBasicMaterial color="#242322" />
                </mesh>
                {/* paper roll hint */}
                <mesh position={[0, 0.67, 1.02]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.9, 16]} />
                    <meshBasicMaterial color="#f7f4ec" />
                </mesh>
            </group>

            {/* Stool */}
            <group position={[-1.7, floorY, -0.4]}>
                <mesh position={[0, 0.02, 0]}>
                    <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
                    <meshBasicMaterial color="#555" />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.56, 12]} />
                    <meshBasicMaterial color="#666" />
                </mesh>
                <mesh position={[0, 0.6, 0]}>
                    <cylinderGeometry args={[0.22, 0.22, 0.07, 16]} />
                    <meshBasicMaterial color="#1a1a1a" />
                </mesh>
            </group>

            {/* Work tray / trolley */}
            <group position={[0.85, floorY, -0.9]}>
                <mesh position={[0, 0.02, 0]}>
                    <cylinderGeometry args={[0.22, 0.22, 0.03, 16]} />
                    <meshBasicMaterial color="#666" />
                </mesh>
                <mesh position={[0, 0.45, 0]}>
                    <cylinderGeometry args={[0.025, 0.025, 0.86, 12]} />
                    <meshBasicMaterial color="#777" />
                </mesh>
                <mesh position={[0, 0.9, 0]}>
                    <boxGeometry args={[0.7, 0.04, 0.45]} />
                    <meshBasicMaterial color="#9aa0a6" />
                </mesh>
                {/* power supply */}
                <mesh position={[0.18, 0.96, -0.08]}>
                    <boxGeometry args={[0.22, 0.1, 0.16]} />
                    <meshBasicMaterial color="#151515" />
                </mesh>
                <mesh position={[0.18, 0.96, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
                    <meshBasicMaterial color="#888" />
                </mesh>
                {/* ink bottles */}
                <InkBottle position={[-0.2, 0.92, 0.08]} color="#111111" />
                <InkBottle position={[-0.08, 0.92, 0.12]} color="#7a1f1f" />
                <InkBottle position={[0.02, 0.92, 0.06]} color="#1f3f7a" />
                <InkBottle position={[-0.14, 0.92, -0.08]} color="#1f5a2f" />
                {/* tattoo machine */}
                <TattooMachine position={[-0.05, 0.94, -0.12]} rotation={[0, Math.PI / 5, Math.PI / 2]} scale={0.8} />
                {/* gloves/paper */}
                <mesh position={[0.22, 0.925, 0.12]} rotation={[-Math.PI / 2, 0, 0.3]}>
                    <planeGeometry args={[0.18, 0.12]} />
                    <meshBasicMaterial color="#dfe8f2" />
                </mesh>
            </group>

            {/* Tattoo designs on wall (flash) */}
            <FlashFrame position={[-1.7, 1.1, -4.4]} size={[1.0, 1.5]} textureUrl="/textures/corridor/rysuneknaobraz1.webp" />
            <FlashFrame position={[-0.3, 1.25, -4.4]} size={[1.2, 1.6]} textureUrl="/textures/gallery/bioprzod.webp" />
            <FlashFrame position={[1.3, 1.05, -4.4]} size={[1.3, 0.9]} textureUrl="/textures/corridor/rysuneknaobrazek3.webp" />

            {/* Wall sign */}
            <group position={[0, 2.4, -4.35]}>
                <mesh position={[0, 0, -0.02]}>
                    <planeGeometry args={[2.6, 0.5]} />
                    <meshBasicMaterial color="#2b211a" />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[2.45, 0.38]} />
                    <meshBasicMaterial color="#f3ecdf" />
                </mesh>
            </group>

            {/* Small lamp */}
            <group position={[1.8, floorY, -2.6]}>
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 2.4, 12]} />
                    <meshBasicMaterial color="#555" />
                </mesh>
                <mesh position={[-0.15, 2.35, 0.15]} rotation={[0.5, 0.4, 0]}>
                    <coneGeometry args={[0.18, 0.25, 16, 1, true]} />
                    <meshBasicMaterial color="#d8d2c4" side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    );
};

export default StudioRoom;
