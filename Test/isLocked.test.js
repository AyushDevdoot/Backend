const { isLocked } = require('../src/Helpers/helper.overlap');

const { getLockService } =  require('../src/Services/servcies.lockSlot'); // mock this

jest.mock('../src/Services/servcies.lockSlot'); // this auto-mocks getLockService

describe('isLocked', () => {
	const coachId = 'coach123';
	const baseDate = new Date('2025-04-16');

	const toTime = (dateStr) => new Date(dateStr).toISOString();

	afterEach(() => {
		jest.clearAllMocks();
	});


	it('returns false when there are no locks under the constrain', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T09:30:00'),
				endTime: toTime('2025-04-16T10:30:00'),
			},
			{
				startTime: toTime('2025-04-16T11:30:00'),
				endTime: toTime('2025-04-16T12:30:00'),
			},
			{
				startTime: toTime('2025-04-16T13:30:00'),
				endTime: toTime('2025-04-16T14:30:00'),
			},

		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:50:00'),
			end: toTime('2025-04-16T11:50:00'),
		});

		expect(result).toBe(true);
	});

	it('returns true when there are locks', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T09:30:00'),
				endTime: toTime('2025-04-16T10:30:00'),
			},
			{
				startTime: toTime('2025-04-16T11:30:00'),
				endTime: toTime('2025-04-16T12:30:00'),
			},
			{
				startTime: toTime('2025-04-16T13:35:00'),
				endTime: toTime('2025-04-16T14:35:00'),
			},

		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T14:30:00'),
			end: toTime('2025-04-16T20:50:00'),
		});

		expect(result).toBe(true);
	});

	it('returns false when there are no locks', async () => {
		getLockService.mockResolvedValue([]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(false);
	});

	it('returns true when a lock overlaps with the given range', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T09:30:00'),
				endTime: toTime('2025-04-16T10:30:00'),
			},
		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(true);
	});

	it('returns false when the lock is on a different date', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-15T10:00:00'),
				endTime: toTime('2025-04-15T11:00:00'),
			},
		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(false);
	});

	it('returns false when the lock ends exactly at the start time (touching, not overlapping)', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T09:00:00'),
				endTime: toTime('2025-04-16T10:00:00'),
			},
		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(false);
	});

	it('returns false when the lock starts exactly at the end time (touching, not overlapping)', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T11:00:00'),
				endTime: toTime('2025-04-16T12:00:00'),
			},
		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(false);
	});

	it('returns true when the lock completely wraps the time window', async () => {
		getLockService.mockResolvedValue([
			{
				startTime: toTime('2025-04-16T09:00:00'),
				endTime: toTime('2025-04-16T12:00:00'),
			},
		]);

		const result = await isLocked({
			coachId,
			startDate: baseDate,
			endDate: baseDate,
			start: toTime('2025-04-16T10:00:00'),
			end: toTime('2025-04-16T11:00:00'),
		});

		expect(result).toBe(true);
	});
});

