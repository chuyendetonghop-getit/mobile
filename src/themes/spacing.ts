import {Dimensions} from 'react-native';

const DW = 390;
export const {width: appWidth, height: appHeight} = Dimensions.get('window');
const scale = appWidth / DW;
export const getSize = (value: number) => value * scale;

export const spacing = {
  space1: getSize(1),
  space2: getSize(2),
  space3: getSize(3),
  space4: getSize(4),
  space5: getSize(5),
  space6: getSize(6),
  space7: getSize(7),
  space8: getSize(8),
  space9: getSize(9),
  space10: getSize(10),
  space11: getSize(11),
  space12: getSize(12),
  space13: getSize(13),
  space14: getSize(14),
  space15: getSize(15),
  space16: getSize(16),
  space17: getSize(17),
  space18: getSize(18),
  space19: getSize(19),
  space20: getSize(20),
  space21: getSize(21),
  space22: getSize(22),
  space23: getSize(23),
  space24: getSize(24),
  space25: getSize(25),
  space26: getSize(26),
  space27: getSize(27),
  space28: getSize(28),
  space29: getSize(29),
  space30: getSize(30),
  space31: getSize(31),
  space32: getSize(32),
  space33: getSize(33),
  space34: getSize(34),
  space35: getSize(35),
  space36: getSize(36),
  space37: getSize(37),
  space38: getSize(38),
  space39: getSize(39),
  space40: getSize(40),
  space41: getSize(41),
  space42: getSize(42),
  space43: getSize(43),
  space44: getSize(44),
  space45: getSize(45),
  space46: getSize(46),
  space47: getSize(47),
  space48: getSize(48),
  space49: getSize(49),
  space50: getSize(50),
  space51: getSize(51),
  space52: getSize(52),
  space53: getSize(53),
  space54: getSize(54),
  space55: getSize(55),
  space56: getSize(56),
  space57: getSize(57),
  space58: getSize(58),
  space59: getSize(59),
  space60: getSize(60),
  space61: getSize(61),
  space62: getSize(62),
  space63: getSize(63),
  space64: getSize(64),
  space65: getSize(65),
  space66: getSize(66),
  space67: getSize(67),
  space68: getSize(68),
  space69: getSize(69),
  space70: getSize(70),
  space71: getSize(71),
  space72: getSize(72),
  space73: getSize(73),
  space74: getSize(74),
  space75: getSize(75),
  space76: getSize(76),
  space77: getSize(77),
  space78: getSize(78),
  space79: getSize(79),
  space80: getSize(80),
  space81: getSize(81),
  space82: getSize(82),
  space83: getSize(83),
  space84: getSize(84),
  space85: getSize(85),
  space86: getSize(86),
  space87: getSize(87),
  space88: getSize(88),
  space89: getSize(89),
  space90: getSize(90),
  space91: getSize(91),
  space92: getSize(92),
  space93: getSize(93),
  space94: getSize(94),
  space95: getSize(95),
  space96: getSize(96),
  space97: getSize(97),
  space98: getSize(98),
  space99: getSize(99),
  space100: getSize(100),
  space101: getSize(101),
  space102: getSize(102),
  space103: getSize(103),
  space104: getSize(104),
  space105: getSize(105),
  space106: getSize(106),
  space107: getSize(107),
  space108: getSize(108),
  space109: getSize(109),
  space110: getSize(110),
  space111: getSize(111),
  space112: getSize(112),
  space113: getSize(113),
  space114: getSize(114),
  space115: getSize(115),
  space116: getSize(116),
  space117: getSize(117),
  space118: getSize(118),
  space119: getSize(119),
  space120: getSize(120),
  space121: getSize(121),
  space122: getSize(122),
  space123: getSize(123),
  space124: getSize(124),
  space125: getSize(125),
  space126: getSize(126),
  space127: getSize(127),
  space128: getSize(128),
  space129: getSize(129),
  space130: getSize(130),
  space131: getSize(131),
  space132: getSize(132),
  space133: getSize(133),
  space134: getSize(134),
  space135: getSize(135),
  space136: getSize(136),
  space137: getSize(137),
  space138: getSize(138),
  space139: getSize(139),
  space140: getSize(140),
  space141: getSize(141),
  space142: getSize(142),
  space143: getSize(143),
  space144: getSize(144),
  space145: getSize(145),
  space146: getSize(146),
  space147: getSize(147),
  space148: getSize(148),
  space149: getSize(149),
  space150: getSize(150),
  space151: getSize(151),
  space152: getSize(152),
  space153: getSize(153),
  space154: getSize(154),
  space155: getSize(155),
  space156: getSize(156),
  space157: getSize(157),
  space158: getSize(158),
  space159: getSize(159),
  space160: getSize(160),
  space161: getSize(161),
  space162: getSize(162),
  space163: getSize(163),
  space164: getSize(164),
  space165: getSize(165),
  space166: getSize(166),
  space167: getSize(167),
  space168: getSize(168),
  space169: getSize(169),
  space170: getSize(170),
  space171: getSize(171),
  space172: getSize(172),
  space173: getSize(173),
  space174: getSize(174),
  space175: getSize(175),
  space176: getSize(176),
  space177: getSize(177),
  space178: getSize(178),
  space179: getSize(179),
  space180: getSize(180),
  space181: getSize(181),
  space182: getSize(182),
  space183: getSize(183),
  space184: getSize(184),
  space185: getSize(185),
  space186: getSize(186),
  space187: getSize(187),
  space188: getSize(188),
  space189: getSize(189),
  space190: getSize(190),
  space191: getSize(191),
  space192: getSize(192),
  space193: getSize(193),
  space194: getSize(194),
  space195: getSize(195),
  space196: getSize(196),
  space197: getSize(197),
  space198: getSize(198),
  space199: getSize(199),
  space200: getSize(200),
  space207: getSize(207),
  space215: getSize(215),
  space220: getSize(220),
  space225: getSize(225),
  space240: getSize(240),
  space243: getSize(243),
  space262: getSize(262),
  space275: getSize(275),
  space302: getSize(302),
  space303: getSize(303),
  space335: getSize(335),
  space350: getSize(350),
  space467: getSize(467),
};
