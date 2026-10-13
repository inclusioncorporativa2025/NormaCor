/* Fondo del pie, calcado de la referencia. Todas las cifras salen de
   medirla, no de dibujarla a ojo:
   - los cuatro círculos, por ajuste de mínimos cuadrados sobre su borde
     (error medio por debajo de medio píxel);
   - las tres olas y el trazo, columna a columna, suavizados después.
   Reconstruido y comparado píxel a píxel con la referencia, la
   diferencia media es de 2,6 sobre 765.

   Orden de pintado, de atrás adelante: ola lila, ola azul, ola pálida,
   trazo, círculos. El círculo azul de arriba a la derecha, su aro y su
   punto se quitaron a propósito: estorbaban a la columna "Legal".

   Coordenadas del lienzo original, 1542 × 528. Se escala con "slice" y
   no con "none": deformarlo convertiría los círculos en elipses. Al ser
   el pie más bajo que esa proporción, `slice` recorta; con `YMax` el
   recorte se lo come entero la franja vacía de arriba y las olas suben
   todo lo posible respecto al texto. */
export default function PieFondo() {
  return (
    <svg
      className="pie__fondo"
      viewBox="0 0 1542 528"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="pie-g-lila" x1="0" x2="1542" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#eae7f8" />
          <stop offset="0.6" stopColor="#eeeafa" />
          <stop offset="1" stopColor="#e7ecf9" />
        </linearGradient>
        <linearGradient id="pie-g-azul" x1="880" x2="1542" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d5ddf3" />
          <stop offset="0.5" stopColor="#d0dcf2" />
          <stop offset="1" stopColor="#cddaf2" />
        </linearGradient>
        <linearGradient id="pie-g-palida" x1="0" x2="1542" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0e5f6" />
          <stop offset="0.38" stopColor="#dbe3f5" />
          <stop offset="1" stopColor="#d7e1f4" />
        </linearGradient>
        {/* El trazo cambia de color: lila a la izquierda, azul desde
            un tercio del ancho. */}
        <linearGradient id="pie-g-trazo" x1="0" x2="1542" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c3a2e0" />
          <stop offset="0.16" stopColor="#bba3df" />
          <stop offset="0.3" stopColor="#8fa6d8" />
          <stop offset="1" stopColor="#8aa2d6" />
        </linearGradient>
      </defs>

      <g data-pie-ola>
        <path d="M-20 432C-3 430 50 424 80 420C110 416 140 412 160 409C180 406 187 404 200 402C213 400 227 400 240 400C253 400 267 400 280 401C293 402 307 404 320 405C333 406 343 408 360 410C377 412 400 416 420 416C440 416 463 413 480 412C497 411 507 411 520 410C533 409 547 408 560 406C573 404 587 401 600 398C613 395 627 390 640 386C653 382 667 377 680 372C693 367 707 361 720 355C733 349 747 343 760 337C773 331 787 324 800 317C813 310 827 303 840 296C853 289 867 282 880 275C893 268 907 262 920 255C933 248 947 241 960 234C973 227 987 221 1000 215C1013 209 1027 203 1040 198C1053 193 1067 188 1080 184C1093 180 1107 177 1120 174C1133 171 1147 168 1160 166C1173 164 1187 164 1200 163C1213 162 1227 162 1240 163C1253 164 1267 165 1280 167C1293 169 1303 174 1320 176C1337 178 1360 180 1380 181C1400 182 1420 181 1440 183C1460 185 1480 188 1500 193C1520 197 1552 206 1562 209L1562 540L-20 540Z" fill="url(#pie-g-lila)" />
      </g>
      <g data-pie-ola>
        <path d="M-20 505C50 502 280 494 400 485C520 476 633 459 700 448C767 437 777 428 800 420C823 412 827 406 840 398C853 390 867 379 880 372C893 365 907 360 920 354C933 348 947 341 960 335C973 329 987 322 1000 316C1013 310 1027 303 1040 297C1053 291 1067 287 1080 282C1093 277 1107 272 1120 268C1133 264 1147 260 1160 257C1173 254 1187 250 1200 247C1213 244 1227 243 1240 241C1253 239 1267 237 1280 236C1293 235 1307 234 1320 234C1333 234 1347 234 1360 234C1373 234 1387 236 1400 237C1413 238 1427 240 1440 243C1453 246 1467 248 1480 252C1493 256 1506 261 1520 265C1534 269 1555 274 1562 276L1562 540L-20 540Z" fill="url(#pie-g-azul)" />
      </g>
      <g data-pie-ola>
        <path d="M-20 474C-3 470 50 459 80 452C110 445 140 437 160 432C180 427 187 423 200 420C213 417 227 414 240 412C253 410 267 408 280 407C293 406 307 406 320 406C333 406 347 406 360 407C373 408 387 410 400 411C413 412 427 414 440 416C453 418 467 420 480 421C493 422 507 424 520 425C533 426 547 427 560 428C573 429 587 430 600 430C613 430 627 430 640 430C653 430 667 430 680 428C693 426 707 424 720 421C733 418 747 416 760 413C773 410 787 404 800 401C813 398 827 396 840 393C853 390 867 386 880 384C893 382 907 382 920 383C933 384 947 387 960 389C973 391 983 392 1000 395C1017 398 1043 402 1060 405C1077 408 1087 410 1100 413C1113 416 1127 420 1140 423C1153 426 1167 430 1180 433C1193 436 1200 438 1220 444C1240 450 1280 464 1300 469C1320 474 1317 473 1340 477C1363 481 1403 488 1440 493C1477 498 1542 505 1562 507L1562 540L-20 540Z" fill="url(#pie-g-palida)" />
      </g>
      <path
        d="M0 329C10 330 40 331 60 337C80 343 100 355 120 366C140 377 160 391 180 403C200 414 220 425 240 434C260 443 280 450 300 455C320 460 340 464 360 466C380 469 400 469 420 470C440 470 460 468 480 467C500 465 520 462 540 459C560 456 580 452 600 448C620 443 640 438 660 432C680 427 700 421 720 414C740 408 760 401 780 393C800 385 820 377 840 368C860 360 880 350 900 341C920 332 940 322 960 312C980 302 1000 292 1020 282C1040 273 1060 263 1080 255C1100 246 1120 237 1140 230C1160 222 1180 215 1200 209C1220 203 1240 197 1260 193C1280 188 1300 185 1320 182C1340 180 1360 178 1380 178C1400 177 1420 178 1440 180C1460 182 1480 185 1500 190C1520 194 1552 202 1562 205"
        stroke="url(#pie-g-trazo)"
        strokeWidth="1.6"
        fill="none"
      />

      <circle data-pie-circulo cx="9" cy="480" r="130" fill="#dbc1ea" />
      <circle data-pie-circulo cx="163" cy="351" r="19" fill="#d9c0ea" />
    </svg>
  );
}
