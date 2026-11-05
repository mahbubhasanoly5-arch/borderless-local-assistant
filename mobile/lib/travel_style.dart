import 'dart:ui';

import 'package:flutter/material.dart';

/// Translucent surface over destination photography, with a readable dark tint.
class TravelGlass extends StatelessWidget {
  const TravelGlass({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(18),
  });
  final Widget child;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) => ClipRRect(
    borderRadius: BorderRadius.circular(26),
    child: BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
      child: Container(
        padding: padding,
        decoration: BoxDecoration(
          color: const Color(0xb31a403e),
          borderRadius: BorderRadius.circular(26),
          border: Border.all(color: const Color(0x55ffffff)),
        ),
        child: child,
      ),
    ),
  );
}

/// Original decorative landscape; never presented as a destination photograph.
class TravelLandscape extends StatelessWidget {
  const TravelLandscape({super.key});
  @override
  Widget build(BuildContext context) =>
      const ExcludeSemantics(child: CustomPaint(painter: _LandscapePainter()));
}

class _LandscapePainter extends CustomPainter {
  const _LandscapePainter();
  @override
  void paint(Canvas canvas, Size size) {
    final bounds = Offset.zero & size;
    canvas.drawRect(
      bounds,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xff80b9c3), Color(0xff294e53), Color(0xff173c35)],
        ).createShader(bounds),
    );
    canvas.drawCircle(
      Offset(size.width * .78, size.height * .2),
      size.shortestSide * .09,
      Paint()..color = const Color(0x99f5e9bd),
    );
    for (final layer in [
      (.43, .12, const Color(0xff53848a)),
      (.62, .24, const Color(0xff315f65)),
      (.82, .35, const Color(0xff183e3e)),
    ]) {
      final ridge = Path()
        ..moveTo(0, size.height * layer.$1)
        ..lineTo(size.width * .23, size.height * layer.$2)
        ..lineTo(size.width * .49, size.height * (layer.$1 + .07))
        ..lineTo(size.width * .75, size.height * (layer.$2 + .11))
        ..lineTo(size.width, size.height * (layer.$1 - .04))
        ..lineTo(size.width, size.height)
        ..lineTo(0, size.height)
        ..close();
      canvas.drawPath(ridge, Paint()..color = layer.$3);
    }
  }

  @override
  bool shouldRepaint(covariant _LandscapePainter oldDelegate) => false;
}
