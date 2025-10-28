import { useRef, useEffect, useState } from 'react'
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl'
import './DarkVeil.css'

const vertex = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;
uniform float uWarp;

out vec4 fragColor;

float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    
    // Create a simple animated gradient
    float gradient = length(uv + sin(uTime * 0.5) * 0.2);
    
    // Base color with animation
    vec3 color = mix(
        vec3(0.1, 0.3, 0.6),  // Dark blue
        vec3(0.6, 0.2, 0.5),  // Purple
        gradient + sin(uTime) * 0.2
    );
    
    // Add scanlines
    float scanline = sin(gl_FragCoord.y * uScanFreq + uTime * 5.0) * 0.5 + 0.5;
    color *= 1.0 - (scanline * scanline) * uScan;
    
    // Add noise
    float noiseValue = (noise(gl_FragCoord.xy + uTime) - 0.5) * uNoise;
    color += vec3(noiseValue);
    
    // Simple hue shift
    float angle = uHueShift * 0.0174533; // Convert to radians
    mat3 hueMatrix = mat3(
        1.0, 0.0, 0.0,
        0.0, cos(angle), -sin(angle),
        0.0, sin(angle), cos(angle)
    );
    color = hueMatrix * color;
    
    fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export default function DarkVeil({
  hueShift = 0,
  noiseIntensity = 0.02,
  scanlineIntensity = 0.02,
  speed = 0.5,
  scanlineFrequency = 0.1,
  warpAmount = 0.1,
  resolutionScale = 1
}) {
  const ref = useRef(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    let frame = 0
    try {
      const canvas = ref.current
      if (!canvas) {
        console.warn('DarkVeil: Canvas not found')
        setUseFallback(true)
        return
      }

      const parent = canvas.parentElement
      if (!parent) {
        console.warn('DarkVeil: Parent element not found')
        setUseFallback(true)
        return
      }

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        canvas,
        alpha: true
      })

      const gl = renderer.gl
      console.log('WebGL Version:', gl.getParameter(gl.VERSION))
      console.log('WebGL Vendor:', gl.getParameter(gl.VENDOR))
      console.log('WebGL Renderer:', gl.getParameter(gl.RENDERER))

      const geometry = new Triangle(gl)

      // Create and check shader program
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: new Vec2() },
          uHueShift: { value: hueShift },
          uNoise: { value: noiseIntensity },
          uScan: { value: scanlineIntensity },
          uScanFreq: { value: scanlineFrequency },
          uWarp: { value: warpAmount }
        }
      })

      const mesh = new Mesh(gl, { geometry, program })

      const resize = () => {
        const w = parent.clientWidth
        const h = parent.clientHeight
        renderer.setSize(w * resolutionScale, h * resolutionScale)
        program.uniforms.uResolution.value.set(w, h)
      }

      window.addEventListener('resize', resize)
      resize()

      const start = performance.now()

      const loop = () => {
        try {
          program.uniforms.uTime.value = ((performance.now() - start) / 1000) * speed
          program.uniforms.uHueShift.value = hueShift
          program.uniforms.uNoise.value = noiseIntensity
          program.uniforms.uScan.value = scanlineIntensity
          program.uniforms.uScanFreq.value = scanlineFrequency
          program.uniforms.uWarp.value = warpAmount
          
          renderer.render({ scene: mesh })
          frame = requestAnimationFrame(loop)
        } catch (err) {
          console.error('DarkVeil render error:', err)
          setUseFallback(true)
          cancelAnimationFrame(frame)
        }
      }

      loop()

      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('resize', resize)
        renderer.dispose()
      }
    } catch (err) {
      console.error('DarkVeil init error:', err)
      setUseFallback(true)
      return () => cancelAnimationFrame(frame)
    }
  }, [hueShift, noiseIntensity, scanlineIntensity, speed, scanlineFrequency, warpAmount, resolutionScale])

  if (useFallback) {
    return <div className="darkveil-fallback" />
  }

  return <canvas ref={ref} className="darkveil-canvas" />
}