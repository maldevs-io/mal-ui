'use client';

import { Carousel } from 'mal-ui/carousel';
import { Card, Image, Paper, Stack, Text, Title } from 'mal-ui/core';

const slides = Array.from({ length: 5 }, (_, i) => ({
  src: `https://placehold.co/600x300?text=Slide+${i + 1}`,
  caption: `Slide ${i + 1}`,
}));

export default function CarouselPage() {
  return (
    <Stack gap="lg">
      <Title order={2}>Carousel</Title>
      <Card withBorder padding="md">
        <Carousel
          slideSize="70%"
          height={220}
          slideGap="md"
          withIndicators
          emblaOptions={{ align: 'start', loop: true }}
        >
          {slides.map((s) => (
            <Carousel.Slide key={s.caption}>
              <Paper withBorder>
                <Image src={s.src} alt={s.caption} h={200} />
                <Text ta="center" p="xs">
                  {s.caption}
                </Text>
              </Paper>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Card>
    </Stack>
  );
}
